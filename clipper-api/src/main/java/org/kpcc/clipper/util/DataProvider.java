package org.kpcc.clipper.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct; // for Java >9, use `jakarta.annotation.PostConstruct`

@Component
@PropertySource("classpath:api.properties")
public class DataProvider {

    @Value("${spring.datasource.url}")
    private String url;
    @Value("${spring.datasource.driverClassName}")
    private String driverClassName;
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;

    @PostConstruct
    private void postConstruct() {
        try {
            Class.forName(driverClassName);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    final String createSql =
        "create table if not exists faves (\n" +
        "    user_id varchar(255) NOT NULL,\n" +
        "    clip_id varchar(255) NOT NULL,\n" +
        "    clip_json varchar(255),\n" +
        "    primary key (user_id, clip_id)\n" +
        ")";
    public void createFaves() {
        try (
            Connection conn = DriverManager.getConnection(url);
            PreparedStatement stmt = conn.prepareStatement(createSql)
        ) {
            stmt.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    final static String findAllSql =
        "select clip_id\n" +
        "from faves where user_id = ?"
        ;
    public Map<String, Boolean> getFavorites(String userId) {
        createFaves();

        Map<String, Boolean> result = new HashMap<>();
        try (
            Connection conn = DriverManager.getConnection(url);
            PreparedStatement stmt = conn.prepareStatement(findAllSql)
        ) {
            stmt.setString(1, userId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                String clipId = rs.getString("clip_id");
                result.put(clipId, true);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    final static String insertSql =
        "insert into faves (user_id, clip_id)\n" +
        "values (?, ?)"
        ;
    final static String deleteSql =
        "delete from faves\n" +
        "where user_id=? and clip_id=?"
        ;
    public boolean updateFavorite(String userId,
                                  String clipId,
                                  boolean isFavorite) {
        createFaves();

        try (
            Connection conn = DriverManager.getConnection(url);
            PreparedStatement insertStmt = conn.prepareStatement(insertSql);
            PreparedStatement deleteStmt = conn.prepareStatement(deleteSql)
        ) {
            if (isFavorite) {
                insertStmt.setString(1, userId);
                insertStmt.setString(2, clipId);
                insertStmt.execute();
            } else {
                deleteStmt.setString(1, userId);
                deleteStmt.setString(2, clipId);
                deleteStmt.execute();
            }
        } catch (SQLException e) {
            // error code/message specific to H2
            if (e.getErrorCode() == 23505
                || e.getMessage().indexOf("Unique index or primary key violation") == 0) {
                return !isFavorite; // not updated
            }
            throw new RuntimeException(e);
        }
        return isFavorite; // not accurate in case of deleting nonexistent record
    }
}
