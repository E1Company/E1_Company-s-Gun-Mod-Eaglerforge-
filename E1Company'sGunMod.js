// Define the custom tab
eaglerforge.registerCreativeTab({
    name: "e1_companys_gun_mod_tab",
    displayName: "E1_Companys Gun Mod Tab",
    items: ["rifle", "pistol", "shotgun", "grenade", "knife"]
});

// Define the rifle item (no animations)
eaglerforge.registerItem({
    name: "rifle",
    displayName: "Automatic Rifle",
    texture: "https://p.novaskin.me/4307943112.png",
    creativeTab: "e1_companys_gun_mod_tab",
    onUse: function(player, world, itemStack) {
        // Start shooting automatically
        startAutoShooting(player, world);
    },
    onRelease: function(player, world, itemStack) {
        // Stop shooting when the player releases the use button
        stopAutoShooting();
    }
});

// Define the pistol item
eaglerforge.registerItem({
    name: "pistol",
    displayName: "Pistol",
    texture: "https://p.novaskin.me/1515933835.png",
    creativeTab: "e1_companys_gun_mod_tab",
    onUse: function(player, world, itemStack) {
        // Check if cooldown is active
        if (!itemStack.cooldown) {
            // Play crossbow animation
            player.playAnimation("crossbow_shoot");

            // Function to shoot a single bullet
            shootBullet(player, world);

            // Set cooldown for pistol
            itemStack.cooldown = true;
            setTimeout(function() {
                itemStack.cooldown = false;
            }, 1000); // Cooldown duration in milliseconds
        }
    }
});

// Define the shotgun item
eaglerforge.registerItem({
    name: "shotgun",
    displayName: "Shotgun",
    texture: "https://p.novaskin.me/4062183121.png",
    creativeTab: "e1_companys_gun_mod_tab",
    onUse: function(player, world, itemStack) {
        // Check if cooldown is active
        if (!itemStack.cooldown) {
            // Play crossbow animation
            player.playAnimation("crossbow_shoot");

            // Function to shoot multiple bullets
            shootShotgun(player, world);

            // Set cooldown for shotgun
            itemStack.cooldown = true;
            setTimeout(function() {
                itemStack.cooldown = false;
            }, 2000); // Cooldown duration in milliseconds
        }
    }
});

// Define the grenade item
eaglerforge.registerItem({
    name: "grenade",
    displayName: "Grenade",
    texture: "https://p.novaskin.me/4062183121.png", // replace with actual grenade texture
    creativeTab: "e1_companys_gun_mod_tab",
    onUse: function(player, world, itemStack) {
        // Check if cooldown is active
        if (!itemStack.cooldown) {
            // Play crossbow animation
            player.playAnimation("crossbow_shoot");

            // Function to throw a grenade
            throwGrenade(player, world);

            // Set cooldown for grenade
            itemStack.cooldown = true;
            setTimeout(function() {
                itemStack.cooldown = false;
            }, 2000); // Cooldown duration in milliseconds
        }
    }
});

// Define the knife item
eaglerforge.registerItem({
    name: "knife",
    displayName: "Knife",
    texture: "https://p.novaskin.me/4062183121.png", // replace with actual knife texture
    creativeTab: "e1_companys_gun_mod_tab",
    onUse: function(player, world, itemStack) {
        // Function to attack with knife
        knifeAttack(player, world);
    }
});

// Variable to keep track of the shooting interval
var shootingInterval = null;

// Function to start automatic shooting (for rifle)
function startAutoShooting(player, world) {
    if (!shootingInterval) {
        shootingInterval = setInterval(function() {
            shootArrow(player, world);
        }, 200); // Adjust the interval (in milliseconds) for the firing rate
    }
}

// Function to stop automatic shooting (for rifle)
function stopAutoShooting() {
    if (shootingInterval) {
        clearInterval(shootingInterval);
        shootingInterval = null;
    }
}

// Function to shoot an arrow (for rifle)
function shootArrow(player, world) {
    // Spawn an arrow entity
    var arrow = {
        type: "arrow", // Arrow entity type
        position: player.getPosition().add(player.getLookDirection()), // Adjust to start in front of the player
        velocity: player.getLookDirection().multiply(1.5) // Adjust the speed of the arrow
    };

    // Spawn the arrow entity in the world
    world.spawnEntity(arrow);
}

// Function to shoot a bullet (for pistol)
function shootBullet(player, world) {
    // Spawn a bullet entity
    var bullet = {
        type: "arrow", // Using arrow as the bullet entity type
        position: player.getPosition().add(player.getLookDirection()), // Adjust to start in front of the player
        velocity: player.getLookDirection().multiply(1.5) // Adjust the speed of the bullet
    };

    // Spawn the bullet entity in the world
    world.spawnEntity(bullet);
}

// Function to shoot multiple bullets (for shotgun)
function shootShotgun(player, world) {
    for (var i = 0; i < 4; i++) {
        // Adjust the position and direction slightly for each bullet
        var direction = player.getLookDirection().add(
            new Vector3d(
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1
            )
        );

        var bullet = {
            type: "arrow", // Using arrow as the bullet entity type
            position: player.getPosition().add(direction), // Adjust to start in front of the player
            velocity: direction.multiply(1.5) // Adjust the speed of the bullet
        };

        // Spawn the bullet entity in the world
        world.spawnEntity(bullet);
    }
}

// Function to throw a grenade
function throwGrenade(player, world) {
    // Define the grenade entity
    var grenade = {
        type: "snowball", // Using snowball as the grenade entity type
        position: player.getPosition().add(player.getLookDirection()), // Adjust to start in front of the player
        velocity: player.getLookDirection().multiply(1.5), // Adjust the speed of the grenade
        onCollision: function(entity, world) {
            // Create explosion effect
            world.createExplosion(entity.position, 2.0); // Explosion power
        }
    };

    // Spawn the grenade entity in the world
    world.spawnEntity(grenade);
}

// Function to attack with a knife
function knifeAttack(player, world) {
    // Play attack animation (if any) and handle attack logic
    player.playAnimation("attack_swing");
    var target = player.getTargetEntity();
    if (target) {
        target.damage(10); // Adjust the damage value
    }
}
