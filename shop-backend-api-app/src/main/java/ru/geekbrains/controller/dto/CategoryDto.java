package ru.geekbrains.controller.dto;

import com.fasterxml.jackson.annotation.JsonTypeInfo;

import java.io.Serializable;

@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
public class CategoryDto implements Serializable {

    private Long id;

    private String name;

    public CategoryDto() {
    }

    public CategoryDto(Long id) {
        this.id = id;
    }

    public CategoryDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
