package com.securestack.sdms.entity;

import com.securestack.sdms.enums.ScrutinyStatus;
import com.securestack.sdms.enums.Severity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "scrutiny_cases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScrutinyCase {

    @Id
    @Column(length = 64)
    private String id;

    @Column(nullable = false, length = 64)
    private String instrumentId;

    @Column(nullable = false, length = 64)
    private String fdrNumber;

    @Column(nullable = false, length = 255)
    private String institution;

    @Column(nullable = false, length = 128)
    private String bank;

    @Column(nullable = false, length = 255)
    private String issue;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private Severity severity;

    @Column(length = 128)
    private String assignedTo;

    @Column(length = 128)
    private String assignedToName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ScrutinyStatus status;

    @Column(nullable = false)
    private Integer slaHours;

    @Column(nullable = false)
    private Boolean slaOverdue;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}
