package com.my.model.dto;

import com.my.model.OrderItem;
import lombok.Data;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Data
public class CartDTO {
    private BigDecimal total = new BigDecimal(0);
    private Map<Integer, OrderItem> orderItems = new HashMap<>();

    public void remove(int dishID) {
        orderItems.remove(dishID);
        changeTotal();
    }

    public void changeProductQuantity(int newQuantity, int dishID) {
        orderItems.get(dishID).setQuantity(newQuantity);
        changeTotal();
    }

    public void add (OrderItem item) {
        orderItems.put(item.getDish().getId(), item);
        changeTotal();
    }

    private void changeTotal() {
        total = orderItems.values().stream()
                .map(OrderItem::getPrice)
                .reduce(BigDecimal.valueOf(0), BigDecimal::add);
    }
}
