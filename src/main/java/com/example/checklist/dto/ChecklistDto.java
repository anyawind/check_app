package com.example.checklist.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChecklistDto {
    private Integer id;
    private Integer idch;
    private String nameCh;
    private Integer status;
    private String comment;
}
