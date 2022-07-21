package com.example.backend.controller;


import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Match;
import com.example.backend.model.User;
import com.example.backend.repository.MatchRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class MatchController {

  @Autowired
  private MatchRepository matchRepository;



  @GetMapping("/matches")
  public List<Match> getMatches()
  {
    System.out.println("In backend");
    List<Match> matches = matchRepository.getMatches();

    for(Match match: matches)
    {
      System.out.println(match.getPlayer());
    }


    return matches;

  }




}

