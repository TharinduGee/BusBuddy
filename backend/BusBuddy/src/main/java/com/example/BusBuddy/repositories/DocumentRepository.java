package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.DocCategory;
import com.example.BusBuddy.models.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    Page<Document> findByBusinessAndCategoryAndDocNameContainingIgnoreCase(Business business, DocCategory docCategory, Optional<String> docName , Pageable pageable);
}
