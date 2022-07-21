package com.example.backend;

import com.example.backend.controller.MatchController;
import com.example.backend.controller.TeamController;
import com.example.backend.controller.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testEncryption() {
		String expected = "lmiirkov";
		String actual = UserController.encrypt("password");

		assertEquals(expected,actual, "Symmetric key encryption");
	}



}
