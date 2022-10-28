package com.my.controller;

import com.my.repository.DishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class HomeController {
    private final DishRepository dishRepository;

    @GetMapping
    public String index(Model model) {
        model.addAttribute("dishes", dishRepository.findTop5ByOrderByOrderCountDesc());

        return "index";
    }
}
