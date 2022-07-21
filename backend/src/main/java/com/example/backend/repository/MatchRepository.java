package com.example.backend.repository;

import com.example.backend.model.Match;
import com.example.backend.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long>{

  @Query(value = "SELECT * FROM matches", nativeQuery =
      true)
  List<Match> getMatches();




}
