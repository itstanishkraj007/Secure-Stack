package com.securestack.sdms.repository;

import com.securestack.sdms.entity.Instrument;
import com.securestack.sdms.enums.LifecycleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InstrumentRepository extends JpaRepository<Instrument, String> {
    Optional<Instrument> findByFdrNumber(String fdrNumber);
    List<Instrument> findByInstitutionCode(String institutionCode);
    List<Instrument> findByLifecycleStatus(LifecycleStatus status);
}
