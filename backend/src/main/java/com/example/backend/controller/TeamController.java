package com.example.backend.controller;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Player;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.repository.TeamRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class TeamController {

  @Autowired
  private TeamRepository teamRepository;

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/home/{id}")
  public List<List<Player>> getTeamOfUser(@PathVariable String id)
  {
    System.out.println("User Team");
    System.out.println("id = "+id);
    List<Player> userTeam = teamRepository.getTeamOfUser(Integer.valueOf(id));
    List<Player> unselectedPlayers = teamRepository.getUnselectedPlayers(Integer.valueOf(id));
    List<List<Player>> teamManagement = new ArrayList<List<Player>>();
    teamManagement.add(userTeam);
    teamManagement.add(unselectedPlayers);

//    for(List<Player> team: teamManagement)
//    {
//      System.out.println(team);
//      System.out.println();
//      System.out.println("Up next:");
//      System.out.println();
//    }

    return teamManagement;

  }

  @GetMapping("/topPlayers")
  public List<Player> getTopPlayers()
  {
    List<Player> topPlayers = teamRepository.getTopPlayers();

    return topPlayers;

  }

  @GetMapping("/topAssists")
  public List<Player> getTopAssists()
  {
    List<Player> topAssists = teamRepository.getTopAssists();

    return topAssists;

  }

  @GetMapping("/topScorers")
  public List<Player> getTopScorers()
  {
    List<Player> topScorers = teamRepository.getTopScorers();

    return topScorers;

  }

  @GetMapping("/home/{id}/add-player/{playerid}")
  public List<List<Player>> addPlayerToUserTeam(@PathVariable String id,
                                      @PathVariable String playerid)
  {
    try{
        teamRepository.addPlayerToUserTeam(Integer.valueOf(id),
                                           Integer.valueOf(playerid));
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }



    return getTeamOfUser(id);

  }

  @GetMapping("/home/{id}/remove-player/{playerid}")
  public List<List<Player>> removePlayerFromUserTeam(@PathVariable String id,
                                                @PathVariable String playerid)
  {
    try{
      teamRepository.removePlayerFromUserTeam(Integer.valueOf(id),
                                         Integer.valueOf(playerid));
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }



    return getTeamOfUser(id);

  }

  int count = 0;

  @PutMapping("/match/{userid}/{scenario}/{playerName}/{time}")
  public ResponseEntity<Player> updatePlayer(@PathVariable String userid,
                                             @PathVariable String scenario,
                                             @PathVariable String playerName,
                                             @PathVariable String time)
  {

    count++;

    playerName = playerName.toLowerCase();


    Player player = teamRepository.findPlayer(playerName);


    List<User> usersHoldingPlayer =
        userRepository.getUsersHoldingPlayerX((int) player.getPlayerid());

    //Update Scenario

    //TODO Remove all white spaces and capital letter from scenario string
    String removeSpaceScenario = scenario.replaceAll("\\s", ""); //removes all
    // white spaces

    String editedScenario = removeSpaceScenario.toLowerCase();

    Player finalPlayer = getScenarioValue(editedScenario,player,scenario,time);

    long points = points(scenario,Integer.valueOf(time)); //points to award

    //update Users

    for(User user: usersHoldingPlayer)
    {
      user.setPoints(user.getPoints() + (int) points);
      User r = userRepository.save(user);

    }

    //Update Users
    finalPlayer.setPoints(player.getPoints() + (int) points);

    Player result = teamRepository.save(finalPlayer);

    return ResponseEntity.ok(result);

  }
  private Player getScenarioValue(String editedScenario, Player player,
                                  String scenario, String time) {

    long scenarioValue = -1;
    System.out.println("Old Value = " +scenarioValue);
    scenarioValue = scenarioValue+1;
    System.out.println("New Value = " +scenarioValue);

    switch (editedScenario)
    {
      case "goal":
        scenarioValue = player.getGoal();
        scenarioValue = scenarioValue+1;
        player.setGoal((int) scenarioValue);
        break;

      case "assist":
        scenarioValue = player.getAssists();
        scenarioValue = scenarioValue+1;
        player.setAssists((int) scenarioValue);
        break;

      case "cleansheet":
        scenarioValue = player.getCleanSheets();
        scenarioValue = scenarioValue+1;
        player.setCleanSheets((int) scenarioValue);
        break;

      case "yellowcard":
        scenarioValue =player.getYellowCards();
        scenarioValue = scenarioValue+1;
        player.setYellowCards((int) scenarioValue);
        break;

      case "redcard":
        scenarioValue = player.getRedCards();
        scenarioValue = scenarioValue+1;
        player.setRedCards((int) scenarioValue);
        break;

      case "save":
        scenarioValue = player.getSaves();
        scenarioValue = scenarioValue+1;
        player.setSaves((int) scenarioValue);
        break;
    }


    return player;

  }


  private boolean updatePlayerScenario(String editedScenario,
                                    long scenarioValue,
                                    long points,
                                    long playerid)
  {
    System.out.println("update player scenario");
    System.out.println(editedScenario);
    boolean result = false;

    switch (editedScenario)
    {
      case "goal":

        try{
          teamRepository.updatePlayerGoal(scenarioValue,points, playerid);
        }
        catch (Exception e)
        {
          e.printStackTrace();
        }

        result = true;
        break;

      case "assist":

        try{
          teamRepository.updatePlayerAssists(scenarioValue,points, playerid);
        }
        catch (Exception e)
        {
          e.printStackTrace();
        }
        result = true;
        break;

      case "cleansheet":

        try{
          teamRepository.updatePlayerCleansheets(scenarioValue,points, playerid);
        }
        catch (Exception e)
        {
          e.printStackTrace();
        }
        result = true;
        break;

      case "yellowcard":


        try{
          teamRepository.updatePlayerYellowCards(scenarioValue,points, playerid);
        }
        catch (Exception e)
        {
          e.printStackTrace();
        }

        result = true;
        break;

      case "redcard":

        try{
          teamRepository.updatePlayerRedCards(scenarioValue,points, playerid);
        }
        catch (Exception e)
        {
          e.printStackTrace();
        }
        result = true;
        break;

      case "save":

        try{
          teamRepository.updatePlayerSaves(scenarioValue,points, playerid);
        }
        catch (Exception e)
        {
          e.printStackTrace();
        }
        result = true;
        break;

    }
    System.out.println("Out here");

    return result;

  }



  public int points(String scenario, int time)
  {
    int points = -1000;
    System.out.println("Points function: " +scenario);
    //TODO Remember to include all FPL Rules here!
    switch(scenario)
    {
      case "Yellow Card":
        System.out.println("Case yellow");
        points = -1;
        break;

      case "Sub Off":
        if(time < 60)
        {
          points = 1;
          break;
        }
        else
        {
          points = 2;
          break;
        }

      case "Sub On":
        points = 1;
        break;
        //TODO - Remember to include extra functionality that consider position
      //TODO of player
      case "Goal":
        points = 3;
        break;
      case "Assist":
        points = 2;
        break;
      case "Red Card":
        points = -3;
        break;
      case "Save":
        points = 2;
        break;
    }
    System.out.println("Final points = " +points);

    return points;
  }






}
