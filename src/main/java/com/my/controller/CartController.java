package com.my.controller;

import com.my.model.dto.CartDTO;
import com.my.model.Dish;
import com.my.model.OrderItem;
import com.my.repository.DishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CartController {
    private final DishRepository dishRepository;

    @GetMapping("/items")
    public Map<String, Object> get(HttpSession session) {
        CartDTO cartDTO = (CartDTO) session.getAttribute("cart");
        Map<String, Object> response = new HashMap<>();
        response.put("total", cartDTO.getTotal());
        response.put("items", cartDTO.getOrderItems().values().toArray());
        return response;
    }


    @PostMapping("/remove/{id}")
    public Map<String, Object> remove(@PathVariable int id, HttpSession session) {
        CartDTO cartDTO = (CartDTO) session.getAttribute("cart");
        cartDTO.remove(id);

        Map<String, Object> response = new HashMap<>();
        response.put("total", cartDTO.getTotal());
        response.put("items", cartDTO.getOrderItems().values().toArray());
        return response;
    }

    @PostMapping("/add/{id}")
    public Map<String, Object> add(@PathVariable int id, @RequestParam int quantity, HttpSession session) {
        Dish dish = dishRepository.findById(id).get();

        if (session.getAttribute("cart") == null) {
            CartDTO cartDTO = new CartDTO();
            session.setAttribute("cart", cartDTO);
        }

        CartDTO cartDTO = (CartDTO) session.getAttribute("cart");

        OrderItem orderItem = new OrderItem();
        orderItem.setDish(dish);
        orderItem.setQuantity(quantity);
        orderItem.setPrice(dish.getPrice().multiply(new BigDecimal(quantity)));

        cartDTO.add(orderItem);

        Map<String, Object> response = new HashMap<>();
        response.put("total", cartDTO.getTotal());
        response.put("items", cartDTO.getOrderItems().values().toArray());
        return response;
    }
}
