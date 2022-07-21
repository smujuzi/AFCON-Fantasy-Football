package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.backend.model.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

  @Query(value = "SELECT userid FROM users WHERE email = ?1 AND password = ?2",
      nativeQuery = true)
  List<Integer> getUserId(String email, String password);

  @Query(value = "insert into users (values(?1,?2,?3,?4,?5,0,?6))",
      nativeQuery = true)
  void register(long newid, String firstName, String lastName, String email,
                String password, long matchday);

  @Query(value = "select max(userid) from users", nativeQuery = true)
  int getNextUserID();

  @Query(value = "select max(matchday) from users", nativeQuery = true)
  int getMatchday();

  @Query(value = "SELECT * FROM users WHERE userid = ?1", nativeQuery = true)
  User getUser(long userid);

  @Query(value = "SELECT * FROM users ORDER BY points DESC", nativeQuery = true)
  List<User> getRanking();

  @Query(value = "SELECT * FROM users WHERE userid IN(SELECT userid FROM teams WHERE playerid=?1)",
      nativeQuery = true)
  List<User> getUsersHoldingPlayerX(long playerid);

  @Query(value = "UPDATE users SET matchday=?1",
      nativeQuery = true)
  void setMatchday(long currentMatchday);
}
