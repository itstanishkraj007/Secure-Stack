package com.securestack.sdms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "audit_events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditEvent {

    @Id
    @Column(length = 64)
    private String id;

    @Column(nullable = false)
    private Long sequenceNumber;

    @Column(nullable = false, length = 64)
    private String timestampIst;

    @Column(nullable = false, length = 128)
    private String actorEmail;

    @Column(nullable = false, length = 32)
    private String actorRole;

    @Column(nullable = false, length = 64)
    private String action;

    @Column(nullable = false, length = 64)
    private String targetType;

    @Column(nullable = false, length = 64)
    private String targetId;

    @Column(nullable = false, length = 64)
    private String correlationId;

    @Column(nullable = false, length = 64)
    private String eventHash;

    @Column(nullable = false, length = 64)
    private String prevHash;
}
