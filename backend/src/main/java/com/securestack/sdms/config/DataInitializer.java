package com.securestack.sdms.config;

import com.securestack.sdms.entity.*;
import com.securestack.sdms.enums.*;
import com.securestack.sdms.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final InstrumentRepository instrumentRepository;
    private final ScrutinyCaseRepository scrutinyCaseRepository;
    private final ReleaseRequestRepository releaseRequestRepository;
    private final AuditEventRepository auditEventRepository;

    @Override
    public void run(String... args) {
        if (instrumentRepository.count() > 0) {
            log.info("Database already initialized with seed data.");
            return;
        }

        log.info("Seeding AICTE SDMS database with initial high-fidelity instruments and audit records...");

        // 1. Seed Instruments
        instrumentRepository.saveAll(List.of(
            Instrument.builder()
                .id("ins-001")
                .fdrNumber("FDR/SBI/2024/001847")
                .institution("Pune Institute of Technology")
                .institutionCode("PIT-MH-001")
                .bankName("State Bank of India")
                .ifsc("SBIN0012345")
                .branch("Shivajinagar, Pune")
                .principalAmount(new BigDecimal("2500000.00"))
                .issueDate(LocalDate.of(2023, 1, 15))
                .maturityDate(LocalDate.of(2026, 1, 15))
                .holderName("Pune Institute of Technology")
                .lifecycleStatus(LifecycleStatus.ACTIVE)
                .lienStatus("ACTIVE")
                .daysToMaturity(79)
                .alertTier("NONE")
                .region("West Zone")
                .state("Maharashtra")
                .build(),

            Instrument.builder()
                .id("ins-002")
                .fdrNumber("FDR/HDFC/2023/003421")
                .institution("MIT College of Engineering, Pune")
                .institutionCode("MITCOE-MH-014")
                .bankName("HDFC Bank")
                .ifsc("HDFC0001234")
                .branch("Pune Camp Branch")
                .principalAmount(new BigDecimal("2500000.00"))
                .issueDate(LocalDate.of(2021, 11, 2))
                .maturityDate(LocalDate.of(2024, 11, 2))
                .holderName("MIT College of Engineering")
                .lifecycleStatus(LifecycleStatus.EXPIRING_SOON)
                .lienStatus("ACTIVE")
                .daysToMaturity(5)
                .alertTier("T15")
                .region("West Zone")
                .state("Maharashtra")
                .build(),

            Instrument.builder()
                .id("ins-003")
                .fdrNumber("FDR/PNB/2022/000987")
                .institution("VIT Vellore")
                .institutionCode("VIT-TN-003")
                .bankName("Punjab National Bank")
                .ifsc("PUNB0012300")
                .branch("Vellore Main Branch")
                .principalAmount(new BigDecimal("3200000.00"))
                .issueDate(LocalDate.of(2020, 3, 10))
                .maturityDate(LocalDate.of(2025, 3, 10))
                .holderName("Vellore Institute of Technology")
                .lifecycleStatus(LifecycleStatus.UNDER_SCRUTINY)
                .lienStatus("ACTIVE")
                .daysToMaturity(133)
                .alertTier("NONE")
                .region("South Zone")
                .state("Tamil Nadu")
                .build(),

            Instrument.builder()
                .id("ins-004")
                .fdrNumber("FDR/BOI/2024/002156")
                .institution("COEP Technological University")
                .institutionCode("COEP-MH-002")
                .bankName("Bank of India")
                .ifsc("BKID0008745")
                .branch("Pune Main Branch")
                .principalAmount(new BigDecimal("1850000.00"))
                .issueDate(LocalDate.of(2024, 6, 20))
                .maturityDate(LocalDate.of(2027, 6, 20))
                .holderName("COEP Technological University")
                .lifecycleStatus(LifecycleStatus.ACTIVE)
                .lienStatus("ACTIVE")
                .daysToMaturity(600)
                .alertTier("NONE")
                .region("West Zone")
                .state("Maharashtra")
                .build(),

            Instrument.builder()
                .id("ins-005")
                .fdrNumber("FDR/CBI/2023/001432")
                .institution("SRM Institute of Science and Technology")
                .institutionCode("SRM-TN-007")
                .bankName("Central Bank of India")
                .ifsc("CBIN0281234")
                .branch("Chennai Anna Nagar")
                .principalAmount(new BigDecimal("5000000.00"))
                .issueDate(LocalDate.of(2021, 4, 1))
                .maturityDate(LocalDate.of(2024, 4, 1))
                .holderName("SRM Institute of Science and Technology")
                .lifecycleStatus(LifecycleStatus.MATURED)
                .lienStatus("ACTIVE")
                .daysToMaturity(-27)
                .alertTier("OVERDUE")
                .region("South Zone")
                .state("Tamil Nadu")
                .build()
        ));

        // 2. Seed Scrutiny Cases
        scrutinyCaseRepository.saveAll(List.of(
            ScrutinyCase.builder()
                .id("SCR-2024-089")
                .instrumentId("ins-002")
                .fdrNumber("FDR/HDFC/2023/003421")
                .institution("MIT College of Engineering, Pune")
                .bank("HDFC Bank")
                .issue("Principal Amount Mismatch (₹1,25,000)")
                .severity(Severity.MAJOR)
                .assignedTo("ravi.prasad@aicte.gov.in")
                .assignedToName("Ravi Shankar Prasad")
                .status(ScrutinyStatus.IN_PROGRESS)
                .slaHours(2)
                .slaOverdue(false)
                .createdAt(LocalDateTime.now().minusHours(5))
                .build(),

            ScrutinyCase.builder()
                .id("SCR-2024-088")
                .instrumentId("ins-006")
                .fdrNumber("FDR/UCO/2022/000654")
                .institution("Manipal Institute of Technology")
                .bank("UCO Bank")
                .issue("Bank Verification Unreachable")
                .severity(Severity.MEDIUM)
                .assignedTo(null)
                .assignedToName(null)
                .status(ScrutinyStatus.OPEN)
                .slaHours(6)
                .slaOverdue(false)
                .createdAt(LocalDateTime.now().minusHours(3))
                .build(),

            ScrutinyCase.builder()
                .id("SCR-2024-087")
                .instrumentId("ins-003")
                .fdrNumber("FDR/PNB/2022/000987")
                .institution("VIT Vellore")
                .bank("Punjab National Bank")
                .issue("QR Code Payload Unverifiable")
                .severity(Severity.MAJOR)
                .assignedTo("ravi.prasad@aicte.gov.in")
                .assignedToName("Ravi Shankar Prasad")
                .status(ScrutinyStatus.OPEN)
                .slaHours(-4)
                .slaOverdue(true)
                .createdAt(LocalDateTime.now().minusDays(1))
                .build()
        ));

        // 3. Seed Release Requests with 5 Gates
        releaseRequestRepository.save(
            ReleaseRequest.builder()
                .id("REL-2024-012")
                .instrumentId("ins-001")
                .fdrNumber("FDR/SBI/2024/001847")
                .institution("Pune Institute of Technology")
                .amount(new BigDecimal("2500000.00"))
                .requestedBy("Dr. Anil Sharma (Nodal Officer)")
                .requestedAt("24 Oct 2024, 16:30 IST")
                .overallStatus("BLOCKED")
                .gates(List.of(
                    ClearanceGate.builder().id("clr-g1").releaseRequestId("REL-2024-012").gateNumber(1).gateName("Scrutiny Verification").responsibleCell("Scrutiny Cell").officerName("Ravi Shankar Prasad").status(GateStatus.CLEARED).updatedAt("26 Oct 2024, 11:30 IST").build(),
                    ClearanceGate.builder().id("clr-g2").releaseRequestId("REL-2024-012").gateNumber(2).gateName("PGRC Clearance").responsibleCell("PGRC Cell").officerName("Meena Agarwal").status(GateStatus.CLEARED).updatedAt("27 Oct 2024, 10:00 IST").build(),
                    ClearanceGate.builder().id("clr-g3").releaseRequestId("REL-2024-012").gateNumber(3).gateName("Vigilance Clearance").responsibleCell("Vigilance Cell").officerName("K.R. Narayanan").status(GateStatus.CLEARED).updatedAt("27 Oct 2024, 14:15 IST").build(),
                    ClearanceGate.builder().id("clr-g4").releaseRequestId("REL-2024-012").gateNumber(4).gateName("Finance / Grants Cell").responsibleCell("Finance Cell").officerName("Suresh Patel").status(GateStatus.ON_HOLD).holdReason("Outstanding PGRC compliance assessment for Academic Year 2023-24 not yet submitted.").updatedAt("27 Oct 2024, 17:15 IST").build(),
                    ClearanceGate.builder().id("clr-g5").releaseRequestId("REL-2024-012").gateNumber(5).gateName("Legal NOC").responsibleCell("Legal Cell").officerName(null).status(GateStatus.NOT_STARTED).isSequentiallyBlocked(true).updatedAt(null).build()
                ))
                .build()
        );

        // 4. Seed Audit Events
        auditEventRepository.saveAll(List.of(
            AuditEvent.builder().id("ae-891").sequenceNumber(891L).timestampIst("28 Oct 2024, 19:43:11").actorEmail("ravi.prasad@aicte.gov.in").actorRole("SCRUTINY").action("DECISION_RECORDED").targetType("ScrutinyCase").targetId("SCR-2024-089").correlationId("req-a3f2b1").eventHash("3f9ad1b2c4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1").prevHash("2c4bf8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7").build(),
            AuditEvent.builder().id("ae-890").sequenceNumber(890L).timestampIst("28 Oct 2024, 19:41:02").actorEmail("system@secure-stack").actorRole("SYSTEM").action("OCR_COMPLETED").targetType("Document").targetId("DOC-0234").correlationId("req-b8e1c2").eventHash("2c4bf8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7").prevHash("9d7ca2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1").build(),
            AuditEvent.builder().id("ae-889").sequenceNumber(889L).timestampIst("28 Oct 2024, 19:38:47").actorEmail("nodal@mitcoe.edu.in").actorRole("INSTITUTION").action("DOCUMENT_UPLOADED").targetType("Document").targetId("DOC-0234").correlationId("req-b8e1c2").eventHash("9d7ca2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1").prevHash("5f3eb9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8").build(),
            AuditEvent.builder().id("ae-888").sequenceNumber(888L).timestampIst("28 Oct 2024, 19:35:12").actorEmail("system@secure-stack").actorRole("SYSTEM").action("MATURITY_ALERT_SENT").targetType("Instrument").targetId("ins-002").correlationId("req-c9d3e4").eventHash("5f3eb9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8").prevHash("7a8bc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2").build()
        ));

        log.info("AICTE SDMS Seed data loaded successfully.");
    }
}
