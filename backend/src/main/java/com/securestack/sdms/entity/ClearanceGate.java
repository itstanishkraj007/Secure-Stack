package com.securestack.sdms.entity;

import com.securestack.sdms.enums.GateStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clearance_gates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClearanceGate {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "release_request_id", length = 64)
    private String releaseRequestId;

    @Column(nullable = false)
    private Integer gateNumber;

    @Column(nullable = false, length = 128)
    private String gateName;

    @Column(nullable = false, length = 128)
    private String responsibleCell;

    @Column(length = 128)
    private String officerName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private GateStatus status;

    @Column(columnDefinition = "TEXT")
    private String holdReason;

    @Column(length = 64)
    private String updatedAt;

    private Boolean isSequentiallyBlocked;
}
