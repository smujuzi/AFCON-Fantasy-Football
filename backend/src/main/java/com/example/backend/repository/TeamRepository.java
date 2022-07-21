package com.example.backend.repository;

import com.example.backend.model.Player;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Player, Long>{

  @Query(value = "SELECT * FROM players NATURAL JOIN teams WHERE userid= ?1",
      nativeQuery = true)
  List<Player> getTeamOfUser(long userid);


  @Query(value = "SELECT * FROM players WHERE playerid NOT IN(SELECT playerid" +
                 " FROM teams WHERE userid = ?1 )",
      nativeQuery = true)
  List<Player> getUnselectedPlayers(long userid);

  @Query(value = "insert into teams (values(?1,?2))",
      nativeQuery = true)
  void addPlayerToUserTeam(long userid, long playerid);

  @Query(value = "DELETE FROM teams WHERE userid= ?1 AND playerid= ?2",
      nativeQuery = true)
  void removePlayerFromUserTeam(long userid, long playerid);


  @Query(value = "SELECT points FROM players WHERE playerid=?1",
      nativeQuery = true)
  long getCurrentPoints(long playerid);

  @Query(value = "SELECT * FROM players WHERE name=?1",
      nativeQuery = true)
  Player findPlayer(String playerName);

  //Update Player functions
  @Query(value = "UPDATE players SET goal =?1, points=?2 WHERE playerid=?3",
      nativeQuery = true)
  void updatePlayerGoal(long goalValue, long points,
                    long playerid);

  @Query(value = "UPDATE players SET assists =?1, points=?2 WHERE playerid=?3",
      nativeQuery = true)
  void updatePlayerAssists(long assitsValue, long points,
                        long playerid);

  @Query(value = "UPDATE players SET cleansheets =?1, points=?2 WHERE " +
                 "playerid=?3",
      nativeQuery = true)
  void updatePlayerCleansheets(long cleansheetsValue, long points,
                        long playerid);

  @Query(value = "UPDATE players SET yellowcards =?1, points=?2 WHERE " +
                 "playerid=?3",
      nativeQuery = true)
  void updatePlayerYellowCards(long yellowcardValue, long points,
                        long playerid);

  @Query(value = "UPDATE players SET redcards =?1, points=?2 WHERE playerid=?3",
      nativeQuery = true)
  void updatePlayerRedCards(long redcardValue, long points,
                        long playerid);

  @Query(value = "UPDATE players SET saves =?1, points=?2 WHERE playerid=?3",
      nativeQuery = true)
  void updatePlayerSaves(long saveValue, long points,
                        long playerid);
  //Get current column values

  @Query(value = "SELECT goal FROM players WHERE playerid= ?1",
      nativeQuery = true)
  long getGoalValue(long playerid);

  @Query(value = "SELECT assists FROM players WHERE playerid= ?1",
      nativeQuery = true)
  long getAssistsValue(long playerid);

  @Query(value = "SELECT cleansheets FROM players WHERE playerid= ?1",
      nativeQuery = true)
  long getCleanSheetsValue(long playerid);

  @Query(value = "SELECT yellowcards FROM players WHERE playerid= ?1",
      nativeQuery = true)
  long getYellowCardValue(long playerid);

  @Query(value = "SELECT redcards FROM players WHERE playerid= ?1",
      nativeQuery = true)
  long getRedCardsValue(long playerid);

  @Query(value = "SELECT saves FROM players WHERE playerid= ?1",
      nativeQuery = true)
  long getSaves(long playerid);

  @Query(value = "SELECT * FROM players ORDER BY goal DESC LIMIT 5",
      nativeQuery = true)
  List<Player> getTopScorers();

  @Query(value = "SELECT * FROM players ORDER BY assists DESC LIMIT 5",
      nativeQuery = true)
  List<Player> getTopAssists();

  @Query(value = "SELECT * FROM players ORDER BY points DESC LIMIT 5",
      nativeQuery = true)
  List<Player> getTopPlayers();

}
