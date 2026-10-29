package com.securestack.sdms.entity;

import com.securestack.sdms.enums.LifecycleStatus;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "instruments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Instrument {

    @Id
    @Column(length = 64)
    private String id;

    @Column(nullable = false, unique = true, length = 64)
    private String fdrNumber;

    @Column(nullable = false, length = 255)
    private String institution;

    @Column(nullable = false, length = 64)
    private String institutionCode;

    @Column(nullable = false, length = 128)
    private String bankName;

    @Column(nullable = false, length = 32)
    private String ifsc;

    @Column(nullable = false, length = 255)
    private String branch;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal principalAmount;

    @Column(nullable = false)
    private LocalDate issueDate;

    @Column(nullable = false)
    private LocalDate maturityDate;

    @Column(nullable = false, length = 255)
    private String holderName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private LifecycleStatus lifecycleStatus;

    @Column(nullable = false, length = 32)
    private String lienStatus;

    @Column(nullable = false)
    private Integer daysToMaturity;

    @Column(length = 32)
    private String alertTier;

    @Column(length = 64)
    private String region;

    @Column(length = 64)
    private String state;
}
