package com.example.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "matches")
@Table(name = "matches")
public class Match {

  @Id
  private long matchid;

  @Column(name = "matchno ")
  private Integer matchno;

  @Column(name = "eventno ")
  private Integer eventno;

  @Column(name = "scenario ")
  private String scenario;

  @Column(name = "player ")
  private String player;

  @Column(name = "time ")
  private Integer time;

  public Match() {
  }

  public long getMatchid() {
    return matchid;
  }

  public void setMatchid(long matchid) {
    this.matchid = matchid;
  }

  public Integer getMatchno() {
    return matchno;
  }

  public void setMatchno(Integer matchno) {
    this.matchno = matchno;
  }

  public Integer getEventno() {
    return eventno;
  }

  public void setEventno(Integer eventno) {
    this.eventno = eventno;
  }

  public String getScenario() {
    return scenario;
  }

  public void setScenario(String scenario) {
    this.scenario = scenario;
  }

  public String getPlayer() {
    return player;
  }

  public void setPlayer(String player) {
    this.player = player;
  }

  public Integer getTime() {
    return time;
  }

  public void setTime(Integer time) {
    this.time = time;
  }
}
