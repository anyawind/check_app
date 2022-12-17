package com.example.checklist.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "checks", schema = "public")
@Data
public class Checks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String nameCh;
    @Column(name = "fio")
    private String fio;
    @Column(name = "address")
    private String address;
    @Column(name = "status")
    private Integer status;
    @Column(name = "number")
    private Integer number;
    @Column(name = "nameobj")
    private String nameobj;
}
