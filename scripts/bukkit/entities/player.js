import { world, system } from "@minecraft/server";
import { BukkitChat } from "../chat/bukkitChat";
import { BukkitEntity } from "./entity";
import { Color } from "../enum/minecraft";

export class BukkitPlayer extends BukkitEntity {
    static NicknameOverride = undefined;

    constructor(name){
        let base = BukkitPlayer.Get(name);
        super(base);

        this.level = base.level;
        this.name = name;
        this.onScreenDisplay = base.onScreenDisplay;
        this.selectedSlot = base.selectedSlot;
        this.spawnDimension = base.spawnDimension;
        this.totalXpNeededForNextLevel = base.totalXpNeededForNextLevel;
        this.xpEarnedAtCurrentLevel = base.xpEarnedAtCurrentLevel;

        this.addExperience = function(amount) {
            return base.addExperience(amount);
        };

        this.addLevels = function(amount) {
            return base.addLevels(amount);
        };

        this.clearSpawn = function() { base.clearSpawn(); };
        this.getItemCooldown = function(itemCategory) { return base.getItemCooldown(itemCategory); };
        this.getSpawnPosition = function() { return base.getSpawnPosition(); };
        this.getTotalXp = function() { return base.getTotalXp(); };
        this.isOp = function() { return base.isOp(); };
        this.playSound = function(soundID, soundOptions = {}) { base.playSound(soundID, soundOptions); };
        this.postClientMessage = function(id, value) { base.postClientMessage(id, value); };
        this.resetLevel = function() { base.resetLevel(); };
        this.sendMessage = function(message) { base.sendMessage(message); };
        this.setOp = function(isOp) { base.setOp(isOp); };
        this.setSpawn = function(spawnPosition, spawnDimension) { base.setSpawn(spawnPosition, spawnDimension); };
        this.startItemCooldown = function(itemCategory, tickDuration) { base.startItemCooldown(itemCategory, tickDuration); };

        this.sendTo = function(message) {
            const dim = world.getDimension("overworld");

            dim.runCommandAsync(`tellraw ${this.name} {"rawtext":[{"text":"${message}"}]}`);
        }

        this.setName = function(name) {
            let _name = base.name;
            //system.run(()=>{    
                if(BukkitPlayer.NicknameOverride == null) {
                    base.nameTag = (
                        configuration.bukkit.nickname.syntax
                        .replace(/<name>/g, base.name)
                        .replace(/<nick>/g, name)
                    );

                    _name = base.nameTag;
                }
                else
                {
                    _name = BukkitPlayer.NicknameOverride(base, name);
                }
            //});
            

            return _name;
        }
    }
    static DebugObject(object, dump = false, prefix = "", ent, color = `${Color.Special.RESET}`) {


        let str = "";
        for(let prop in object) {
            let type = "";

            //Messages.To(ent, `${typeof object[prop]}`);

            if(`${typeof object[prop]}` == "object"){
                type = `(${(object[prop].constructor).toString().match(/ (\w+)/)[1]})`;
            }

            if(`${typeof object[prop]}` == "string" || `${typeof object[prop]}` == "number" || `${typeof object[prop]}` == "boolean"){
                type = `(${(object[prop]).toString()})`;
            }

            str = `${prop}: ${typeof object[prop]}${type}`;

            ent.sendTo(`${prefix}${color}${str}`);


            if(dump == true) {
                if(`${typeof object[prop]}` == "object"){
                    BukkitPlayer.DebugObject(object[prop], dump, prefix + "__", ent, color);
                }
            }
        }



        
    }
    static Create(name){
        let player = BukkitPlayer.Get(name);
        if(player != null) player = new BukkitPlayer(name);
        return player;
    }

    static Get(name){
        let player = undefined;

        let players = world.getAllPlayers();

        players.forEach(p => {
            if(name == p.name) player = p;
        });

        return player;
    }
}