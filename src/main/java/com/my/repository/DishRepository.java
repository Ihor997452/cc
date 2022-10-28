package com.my.repository;

import com.my.model.Category;
import com.my.model.Dish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface DishRepository extends JpaRepository<Dish, Integer> {
    Dish findFirstByOrderByPriceDesc();
    List<Dish> findTop5ByOrderByOrderCountDesc();
    Page<Dish> findByCategory(Category category,
                              Pageable pageable);
    Page<Dish> findByCategoryAndPriceIsLessThanEqual(Category category, BigDecimal price, Pageable pageable);
    Page<Dish> findByPriceIsLessThanEqual(BigDecimal price, Pageable pageable);
}
