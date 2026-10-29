package com.securestack.sdms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "release_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReleaseRequest {

    @Id
    @Column(length = 64)
    private String id;

    @Column(nullable = false, length = 64)
    private String instrumentId;

    @Column(nullable = false, length = 64)
    private String fdrNumber;

    @Column(nullable = false, length = 255)
    private String institution;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, length = 128)
    private String requestedBy;

    @Column(nullable = false, length = 64)
    private String requestedAt;

    @Column(nullable = false, length = 32)
    private String overallStatus;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "release_request_id")
    @Builder.Default
    private List<ClearanceGate> gates = new ArrayList<>();
}
