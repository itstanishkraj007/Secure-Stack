package com.securestack.sdms.service;

import com.securestack.sdms.entity.Instrument;
import com.securestack.sdms.enums.LifecycleStatus;
import com.securestack.sdms.repository.InstrumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InstrumentService {

    private final InstrumentRepository instrumentRepository;

    @Transactional(readOnly = true)
    public List<Instrument> getAllInstruments() {
        return instrumentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Instrument> getInstrumentById(String id) {
        return instrumentRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Instrument> getInstrumentByFdrNumber(String fdrNumber) {
        return instrumentRepository.findByFdrNumber(fdrNumber);
    }

    @Transactional
    public Instrument saveInstrument(Instrument instrument) {
        return instrumentRepository.save(instrument);
    }

    @Transactional(readOnly = true)
    public List<Instrument> getExpiringSoon() {
        return instrumentRepository.findByLifecycleStatus(LifecycleStatus.EXPIRING_SOON);
    }
}
