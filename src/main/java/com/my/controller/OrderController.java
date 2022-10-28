package com.my.controller;

import com.my.model.Order;
import com.my.model.dto.CartDTO;
import com.my.model.OrderItem;
import com.my.repository.OrderItemRepository;
import com.my.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class OrderController {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    @GetMapping("/order")
    public String view() {
        return "order";
    }

    @PostMapping("/order")
    public String order(@RequestParam String  name, @RequestParam String email,
                        @RequestParam String phone, @RequestParam String address,
                        HttpSession session) {
        CartDTO cartDTO = (CartDTO) session.getAttribute("cart");

        if (cartDTO == null || cartDTO.getOrderItems().size() == 0) {
            return "redirect:/menu";
        }

        Order order = new Order();
        order.setTotal(cartDTO.getTotal());
        order.setContactEmail(email);
        order.setContactName(name);
        order.setDeliveryAddress(address);
        order.setContactPhone(phone);
        orderRepository.save(order);

        for (OrderItem item : cartDTO.getOrderItems().values()) {
            item.setOrder(order);
            orderItemRepository.save(item);
        }

        return "redirect:/order";
    }
}
