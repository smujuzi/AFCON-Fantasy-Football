package com.example.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "players")
@Table(name = "players")
public class Player {

  @Id
  private long playerid;

  @Column(name = "name ")
  private String name;

  @Column(name = "position ")
  private String position;

  @Column(name = "team ")
  private String team;

  //Initialize to zero
  @Column(name = "goal ")
  private Integer goal = 0;

  @Column(name = "assists ")
  private Integer assists = 0;

  @Column(name = "cleansheets ")
  private Integer cleanSheets = 0;

  @Column(name = "yellowcards ")
  private Integer yellowCards = 0;

  @Column(name = "redcards ")
  private Integer redCards = 0;

  @Column(name = "saves ")
  private Integer saves = 0;

  @Column(name = "cost ")
  private Integer cost = 0;

  @Column(name = "points ")
  private Integer points = 0;

  public Player() {
  }

  public Player(String name, String position, String team)
  {
    this.name     = name;
    this.position = position;
    this.team     = team;
  }

  public Player(long playerid, String name, String position,
                String team, Integer goal, Integer assists,
                Integer cleanSheets, Integer yellowCards,
                Integer redCards, Integer saves, Integer cost, Integer points) {
    this.playerid    = playerid;
    this.name        = name;
    this.position    = position;
    this.team        = team;
    this.goal       = goal;
    this.assists     = assists;
    this.cleanSheets = cleanSheets;
    this.yellowCards = yellowCards;
    this.redCards    = redCards;
    this.saves       = saves;
    this.cost        = cost;
    this.points      = points;
  }

  public long getPlayerid() {
    return playerid;
  }

  public void setPlayerid(long playerid) {
    this.playerid = playerid;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  public String getTeam() {
    return team;
  }

  public void setTeam(String team) {
    this.team = team;
  }

  public Integer getGoal() {
    return goal;
  }

  public void setGoal(Integer goals) {
    this.goal = goals;
  }

  public Integer getAssists() {
    return assists;
  }

  public void setAssists(Integer assists) {
    this.assists = assists;
  }

  public Integer getCleanSheets() {
    return cleanSheets;
  }

  public void setCleanSheets(Integer cleanSheets) {
    this.cleanSheets = cleanSheets;
  }

  public Integer getYellowCards() {
    return yellowCards;
  }

  public void setYellowCards(Integer yellowCards) {
    this.yellowCards = yellowCards;
  }

  public Integer getRedCards() {
    return redCards;
  }

  public void setRedCards(Integer redCards) {
    this.redCards = redCards;
  }

  public Integer getSaves() {
    return saves;
  }

  public void setSaves(Integer saves) {
    this.saves = saves;
  }

  public Integer getCost() {
    return cost;
  }

  public void setCost(Integer cost) {
    this.cost = cost;
  }

  public Integer getPoints() {
    return points;
  }

  public void setPoints(Integer points) {
    this.points = points;
  }

  @Override
  public String toString() {
    return "Player{" +
           "playerID=" + playerid +
           ", name='" + name + '\'' +
           ", position='" + position + '\'' +
           ", team='" + team + '\'' +
           ", goals=" + goal +
           ", assists=" + assists +
           ", cleanSheets=" + cleanSheets +
           ", yellowCards=" + yellowCards +
           ", redCards=" + redCards +
           ", saves=" + saves +
           ", cost=" + cost +
           ", points=" + points +
           '}';
  }
}
