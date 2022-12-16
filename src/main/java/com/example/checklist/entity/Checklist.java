package com.example.checklist.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "checklist", schema = "public")
@Data
public class Checklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "idch")
    private Integer idch;
    @Column(name = "name")
    private String nameCh;
    @Column(name = "status")
    private Integer status;
    @Column(name = "comment")
    private String comment;
}

