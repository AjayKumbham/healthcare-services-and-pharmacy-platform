package com.test.test.Controller;


import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.test.test.Entity.CartItem;
import com.test.test.Entity.PrimaryUser;
import com.test.test.Entity.UserOrders;
import com.test.test.Entity.PharmaMedInventory;
import com.test.test.Repository.CartItemRepository;
import com.test.test.Repository.PharmaMedInventoryRepository;
import com.test.test.Repository.PrimaryUserRepository;
import com.test.test.Repository.UserOrdersRepository;
import com.test.test.Service.EmailService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class UserOrdersController {

    @Autowired
    private PrimaryUserRepository primaryUserRepository;

    @Autowired
    private UserOrdersRepository userOrdersRepository;

    @Autowired
    private CartItemRepository cartItemRepository;


    @Autowired
    private PharmaMedInventoryRepository pharmaMedInventoryRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/placeOrder")
    public ResponseEntity<UserOrders> postMethodName(@RequestParam String membershipId, @RequestParam int time) {

        List<CartItem> userCart = cartItemRepository.findUserCart(membershipId);

        Optional<PrimaryUser> user = primaryUserRepository.findByMembershipId(membershipId);

        Long coveragePlan = user.map(PrimaryUser::getCoveragePlan).orElse(1L);

        String userEmail = user.map(PrimaryUser::getEmail).orElse("");


        int discount = 0;

        if (coveragePlan == 1) {
            discount = 10;
        } else if (coveragePlan == 2) {
            discount = 20;
        } else if (coveragePlan == 3) {
            discount = 40;
        }

        if ( ( userCart.size() == 0 ) || user == null ) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        double total_price = 0;

        for( CartItem item : userCart ) {
            double unit_price = item.getUnitPrice();
            int quantity = item.getQuantity();

            double med_total_price = (unit_price - unit_price * discount/100 ) * quantity;

            total_price += med_total_price;

        }

        UserOrders order = new UserOrders();

        double deliveryCharges = 10;

        order.setPrice(total_price + deliveryCharges);


        order.setMembershipId(membershipId);
        order.setStatus("Confirmed");
        order.setOrderedDate(new Date());

        int deliveryHour = time + 12;

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, 1);

        calendar.set(Calendar.HOUR_OF_DAY, deliveryHour);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        Date deliveryTime = calendar.getTime();

        order.setDeliveryTime(deliveryTime);


        //TODO: process POST request
        UserOrders savedOrder = userOrdersRepository.save(order);


        emailService.sendOrderSummaryEmail(savedOrder.getOrderId(), userEmail, userCart, total_price, deliveryCharges);


        return new ResponseEntity<>(savedOrder, HttpStatus.OK);
    }

    @GetMapping("/getOrders")
    public ResponseEntity<List<UserOrders>> getMethodName(@RequestParam String membershipID) {
        List<UserOrders> orders = userOrdersRepository.findUserOrders(membershipID);

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/cancelOrder")
    public ResponseEntity<String> cancelOrder(@RequestBody CancelOrderRequest request) {
        Optional<UserOrders> orderOptional = userOrdersRepository.findById(request.getOrderId());

        if (orderOptional.isEmpty()) {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }

        UserOrders order = orderOptional.get();

        // Check if order already cancelled
        if ("Cancelled".equalsIgnoreCase(order.getStatus())) {
            return new ResponseEntity<>("Order is already cancelled", HttpStatus.BAD_REQUEST);
        }

        // Update order status
        order.setStatus("Cancelled");
        userOrdersRepository.save(order);

        return new ResponseEntity<>("Order cancelled successfully", HttpStatus.OK);
    }

    // DTO for Cancel Order Request
    public static class CancelOrderRequest {
        private Long orderId;

        public Long getOrderId() {
            return orderId;
        }

        public void setOrderId(Long orderId) {
            this.orderId = orderId;
        }
    }

}
