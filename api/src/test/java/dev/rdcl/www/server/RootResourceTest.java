package dev.rdcl.www.server;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

@QuarkusTest
public class RootResourceTest {

    @Test
    @DisplayName("When healthy, the application responds with an 'OK'")
    public void testIndex() {
        given()
            .when().get("/")
            .then().statusCode(200).body(is("OK"));
    }
}
