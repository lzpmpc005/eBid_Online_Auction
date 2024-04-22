#include <iostream>
#include <vector>
#include <string>
#include <set>
#include <map>
#include <boost/asio.hpp>
#include <boost/beast.hpp>
#include <boost/beast/websocket.hpp>

using namespace std;
namespace asio = boost::asio;
namespace beast = boost::beast;
namespace websocket = beast::websocket;
using tcp = boost::asio::ip::tcp;

class Session : public std::enable_shared_from_this<Session> {
    public:
        Session(tcp::socket socket, std::map<std::string, int>& items)
            : socket_(std::move(socket)), items_(items), buffer_(8192) {}

        void start() {
            ws_ = std::make_unique<websocket::stream<tcp::socket>>(std::move(socket_));
            ws_->async_accept([self = shared_from_this()](const beast::error_code& ec) {
                if (!ec) {
                    self->do_read();
                }
            });
        }

    private:
        void do_read() {
        ws_->async_read(buffer_, [self = shared_from_this()](const beast::error_code& ec, std::size_t bytes_transferred) {
            if (!ec) {
                std::string message = beast::buffers_to_string(self->buffer_.data());
                std::cout << "Received message from client: " << message << std::endl;

                self->buffer_.consume(bytes_transferred);

                self->do_read();
            } else if (ec != websocket::error::closed) {
                std::cerr << "Error in reading message: " << ec.message() << std::endl;
            }
        });
}

    tcp::socket socket_;
    std::unique_ptr<websocket::stream<tcp::socket>> ws_;
    std::map<std::string, int>& items_;
    beast::flat_buffer buffer_;
};

class AuctionServer {
public:
    AuctionServer(asio::io_context& io_context, const tcp::endpoint& endpoint)
        : acceptor_(io_context, endpoint), socket_(io_context) {
        do_accept();
    }

private:
    void do_accept() {
        acceptor_.async_accept(socket_, [this](const beast::error_code& ec) {
            if (!ec) {
                std::cout << "New connection established" << std::endl;
                std::make_shared<Session>(std::move(socket_), items_)->start();
            }
            do_accept();
        });
    }

    tcp::acceptor acceptor_;
    tcp::socket socket_;
    std::map<std::string, int> items_;
};

int main() {
    try {
        asio::io_context io_context;
        AuctionServer server(io_context, tcp::endpoint(tcp::v4(), 8080));
        io_context.run();
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
    return 0;
}
