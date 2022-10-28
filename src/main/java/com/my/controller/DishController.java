package com.my.controller;

import com.my.model.Category;
import com.my.model.Dish;
import com.my.repository.DishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.BitSet;
import java.util.Date;

@Controller
@RequestMapping("/dishes")
@RequiredArgsConstructor
public class DishController {
    private final DishRepository dishRepository;
    private final String DIR = System.getProperty("user.dir") + "/src/main/uploads/img";

    @GetMapping
    public String view(Model model) {
        model.addAttribute("categories", Category.values());
        model.addAttribute("topPrice", dishRepository.findFirstByOrderByPriceDesc().getPrice());

        return "dishes";
    }

    @GetMapping("/getPage")
    @ResponseBody
    public Page<Dish> get(@RequestParam(required = false) String category,
                          @RequestParam(required = false, name = "g_price") String maxPrice,
                          Pageable pageable) {
        try {
            BigDecimal price = new BigDecimal(maxPrice);

            if (category == null || category.equals("undefined")) {
                return dishRepository.findByPriceIsLessThanEqual(price, pageable);
            }

            return dishRepository.findByCategoryAndPriceIsLessThanEqual(Category.valueOf(category),
                    price, pageable);
        } catch (Exception e) {
            if (category == null || category.equals("undefined")) {
                return dishRepository.findAll(pageable);
            }

            return dishRepository.findByCategory(Category.valueOf(category), pageable);
        }
    }

    @GetMapping("/addForm")
    public String addForm() {
        return "addDish";
    }

    @PostMapping("/new")
    public String add(@RequestParam String name, @RequestParam String desc,
                      @RequestParam int portionSize, @RequestParam BigDecimal price,
                      @RequestParam String category, @RequestParam MultipartFile image) throws IOException {
        String imgName = name + "_" + new Date().getTime() + "_" + image.getOriginalFilename();

        Path path = Paths.get(DIR, imgName);
        Files.write(path, image.getBytes());

        Dish dish = new Dish();
        dish.setName(name);
        dish.setDescription(desc);
        dish.setPrice(price);
        dish.setPortionSize(portionSize);
        dish.setCategory(Category.valueOf(category));
        dish.setImgPath("uploads/img/" + imgName);
        dish.setOrderCount(0L);
        dishRepository.save(dish);

        return "redirect:/dishes";
    }
}
