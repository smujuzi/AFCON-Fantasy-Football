package com.example.backend.controller;


import com.example.backend.model.Player;
import com.example.backend.model.User;
import com.example.backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.repository.UserRepository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserController {

  @Autowired
  private UserRepository userRepository;



  @PostMapping("/register")
  public ResponseEntity<User> addUser(@RequestBody User user)
  {
    System.out.println("Inside add user");
    int newid = getNextUserID();
    int matchday = getMatchday();
    user.setUserID(newid);
    user.setMatchday(matchday);
    System.out.println("Entered Password: " +user.getPassword());
    user.setPassword(encrypt(user.getPassword()));
    System.out.println("Encrypted Password: " +user.getPassword());
    System.out.println(user.toString());
    try{


      userRepository.register(user.getUserID(),
                              user.getFirstName(),
                              user.getLastName(),
                              user.getEmailAddress(),
                              user.getPassword(),
                              user.getMatchday());
    }
    catch(Exception e)
    {
      e.printStackTrace();
    }
    System.out.println("We are here!");
    User newUser =
        userRepository.findById(user.getUserID())
                          .orElseThrow(() -> new ResourceNotFoundException(
                                                                            "User" +
                                                                           " not " +
                                                                           "exist with id" +
                                                                           " " +
                                                                           ":" +user.getUserID()));

    return ResponseEntity.ok(newUser);

  }

  private int getNextUserID() {

    int maxid = -1;
    try{
      maxid = userRepository.getNextUserID();
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }
    System.out.println("MAX ID VALUE = " +maxid);


    if (maxid < 0) {
      maxid = 0;
      return maxid ;
    }

    return maxid + 1;
  }

  private int getMatchday() {

    int maxMatchday = -1;
    try{
      maxMatchday = userRepository.getMatchday();
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }
    System.out.println("MAX MATCHDAY VALUE = " +maxMatchday);


    if (maxMatchday < 0) {
      maxMatchday = 0;
      return maxMatchday ;
    }

    return maxMatchday;
  }

  @GetMapping("/updateMatchday")
  public User  updateMatchday()
  {

    System.out.println("Inside add matchday");
    int currentMatchday = getMatchday();

    if(currentMatchday < 3)
    {
      currentMatchday = currentMatchday+1;
    }
    else
    {
      currentMatchday = 3;
    }

    try{

      userRepository.setMatchday(currentMatchday);
    }
    catch(Exception e)
    {
      e.printStackTrace();
    }




    User user = userRepository.getUser(0);

    return user;

  }

  public static String encrypt(String phrase)
  {
    HashMap<Character,Character> ciphertext = new HashMap<Character, Character>();

    String cipher = "mnbvcxzasdfghjklpoiuytrewq";
    String alphabet = "abcdefghijklmnopqrstuvwxyz";

    for(int i=0; i < alphabet.length(); i++)
    {
      ciphertext.put( alphabet.charAt(i), cipher.charAt(i) );
    }
    String result = "";

    for(int j=0; j < phrase.length(); j++)
    {

      char current = phrase.charAt(j);

      if(!Character.isLetter(current))
      {
        result = result + current;
      }
      else
      {
        result = result + ciphertext.get( current );
      }
    }

    return result;

  }

  public static String decrypt(String phrase)
  {
    HashMap<Character,Character> ciphertext = new HashMap<Character, Character>();

    String cipher = "mnbvcxzasdfghjklpoiuytrewq";
    String alphabet = "abcdefghijklmnopqrstuvwxyz";

    for(int i=0; i < alphabet.length(); i++)
    {
      ciphertext.put( cipher.charAt(i), alphabet.charAt(i) );
    }
    String result = "";

    for(int j=0; j < phrase.length(); j++)
    {

      char current = phrase.charAt(j);

      if(!Character.isLetter(current))
      {
        result = result + current;
      }
      else
      {
        result = result + ciphertext.get( current );
      }
    }

    return result;

  }




  @GetMapping("/login/{email}/{password}")
  public ResponseEntity<List<Integer>> processSignIn(@PathVariable String email,
                                                  @PathVariable String password)
  {
    System.out.println("Entered password: " +password);
    String encryptedPassword = encrypt(password);
    System.out.println("Encrypted Password: " + encryptedPassword);
    return new ResponseEntity<>(userRepository.getUserId(email,encryptedPassword),
                                HttpStatus.OK);
  }

  @GetMapping("/match/{id}")
  public List<User> getRanking()
  {

    List<User> rankings = userRepository.getRanking();
    System.out.println("LIST OF USERS");

    for(User user: rankings){
      System.out.println(user.getUserID() + ":" + user.getFirstName());
    }


    return rankings;

  }

  @GetMapping("/user/{id}")
  public User getUser(@PathVariable Long id)
  {

    User user = userRepository.getUser(id);
    System.out.println("User:");
    System.out.println(user.getUserID());
    System.out.println(user.getFirstName());


    return user;

  }




}

