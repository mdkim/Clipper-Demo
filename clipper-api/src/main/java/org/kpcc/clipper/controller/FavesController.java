package org.kpcc.clipper.controller;

import java.util.Map;

import org.kpcc.clipper.model.Favorite;
import org.kpcc.clipper.util.DataProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class FavesController {

    @Autowired
    DataProvider dataProvider;

    @GetMapping("/favorites")
    public Map<String, Boolean> getFavorites() {
        // TODO: change `userId` to cookie value or other user identifier
        String userId="1";
        return dataProvider.getFavorites(userId);
    }

    @PostMapping("/favorites")
    public boolean updateFavorite(@RequestBody Favorite fave) {
        // TODO: change `userId` to cookie value or other user identifier
        String userId="1";
        return dataProvider.updateFavorite(userId, fave.getClipId(), fave.isFavorite());
    }

    @GetMapping("/error500")
    public void get500() {
        throw new RuntimeException("get500");
    }
}
