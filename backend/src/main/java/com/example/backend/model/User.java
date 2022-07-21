package com.example.backend.model;

import javax.persistence.*;
//import com.stuart.demo.Team.Team;
//import com.stuart.demo.classes.Player;

@Entity(name = "users")
@Table(name = "users")
public class User {

  @Id
  private long    userid;

  @Column(name = "firstname ")
  private String firstName;

  @Column(name = "lastname ")
  private String lastName;

  @Column(name = "email")
  private String emailAddress;

  @Column(name = "password")
  private String password;

  //private Team   team = new Team();

  @Column(name = "points")
  private Integer    points = 0;

  @Column(name = "matchday")
  private Integer    matchday = 0;


  public User() {
  }

  public User(long userid, String firstName, String lastName,
              String emailAddress, String password, Integer points,
              Integer matchday)
  {
    this.userid       = userid;
    this.firstName    = firstName;
    this.lastName     = lastName;
    this.emailAddress = emailAddress;
    this.password     = password;
    this.points       = points;
    this.matchday       = matchday;
  }

  public User(String firstName, String lastName,
              String emailAddress, String password)
  {

    this.firstName    = firstName;
    this.lastName     = lastName;
    this.emailAddress = emailAddress;
    this.password     = password;
    this.points       = 0;
  }

  public long getUserID() {
    return userid;
  }

  public void setUserID(int userID) {
    this.userid = userID;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmailAddress() {
    return emailAddress;
  }

  public void setEmailAddress(String emailAddress) {
    this.emailAddress = emailAddress;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Integer getPoints() {
    return points;
  }

  public void setPoints(Integer points) {
    this.points = points;
  }

  public Integer getMatchday() {
    return matchday;
  }

  public void setMatchday(Integer matchday) {
    this.matchday = matchday;
  }

  @Override
  public String toString() {
    return "User{" +
           "userid=" + userid +
           ", firstName='" + firstName + '\'' +
           ", lastName='" + lastName + '\'' +
           ", emailAddress='" + emailAddress + '\'' +
           ", password='" + password + '\'' +
           ", points=" + points +
           ", matchday=" + matchday +
           '}';
  }
}
