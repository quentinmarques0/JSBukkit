
import { system, world } from "@minecraft/server";
import { BukkitCommand } from "../../bukkit/chat/BukkitCommand";

import { BukkitChat } from "../../bukkit/chat/bukkitChat";
import { BukkitPlayer } from "../../bukkit/entities/player";
import { Color } from "../../bukkit/enum/minecraft";
import { configuration } from "../config";

export class Permission {
    static BASE = "player";
    static BASE_DISPLAY = "Joueur";
    static permissions = [];

    static VIP = 0;
    static VIPPLUS = 1;
    static MODERATOR = 2;
    static ADMINISTRATOR = 3;

    static init(){
        Permission.AddPermission(Permission.BASE, Color.Special.RESET + Permission.BASE_DISPLAY);
        Permission.AddPermission("vip", Color.YELLOW + "VIP", Permission.VIP);
        Permission.AddPermission("vip+", Color.MINECOIN_GOLD + "VIP+", Permission.VIPPLUS);
        Permission.AddPermission("modo", Color.LIGHT_PURPLE + "MODERATOR", Permission.MODERATOR);
        Permission.AddPermission("adm", Color.RED + "ADMINISTRATOR", Permission.ADMINISTRATOR);
    }

    static postload(){
        BukkitCommand.Register( configuration.bukkit.commands.setperm , (arg) => {
            let player = arg.parameters[1];
            let grade = arg.parameters[2];
            let bplayer = BukkitPlayer.Create(player);
            if(bplayer != undefined) Permission.Set(bplayer, grade);
            else arg.sender.sendTo(`${player} isn't connected...`);
        });

        BukkitCommand.Register( configuration.bukkit.commands.listperm , (arg) => {
            
            arg.sender.sendTo(`${configuration.bukkit.permissions.prefix} ${Color.Special.BOLD} id - label`);
            Permission.permissions.forEach(grade => {
                arg.sender.sendTo(`${configuration.bukkit.permissions.prefix} ${grade[0]} - ${grade[1]}`);
            });
        });
    }

    static AddPermission(grade, displayGrade, index = -1) {
        Permission.permissions.push([grade, displayGrade, index]);//tag, display, index
    }

    static Set(player, permission){
        let exist = false;
        Permission.permissions.forEach(g => {
            if(g[0] == permission) exist = true;
        });

        if(exist != true) {
            player.sendTo(`${permission} isn't registered...`);
        }
        system.run(()=>{
            let permissions = player.getTags().filter(p => p.startsWith("permission:"));

            permissions.forEach(element => {

                player.removeTag(element);
            });
            player.addTag(`permission:${permission}`);
            player.sendTo("Permission: "+ permission);
            player.sendTo("Permission?: "+player.hasTag(`permission:${permission}`));
        });


    }

    static Get(player)
    {
        if(player.getTags().filter(p => p.startsWith("permission:")).length <= 0) {
            Permission.Set(BukkitPlayer.Create(player.name), Permission.BASE);
            return Permission.GetDisplay("permission:"+Permission.BASE);
        }


        return Permission.GetDisplay(player.getTags().filter(p => p.startsWith("permission:"))[0]);
    }

    static _getIndex(params) {
        let index = -1;
        Permission.permissions.forEach(perm => {
            if(params == perm[0]){
                index = perm[2];
            }
        });

        return index;
    }

    static GetIndex(player)
    {
        if(player.getTags().filter(p => p.startsWith("permission:")).length <= 0) {
            Permission.Set(player, Permission.BASE);
            return -1;
        }

        let _i =Permission._getIndex(player.getTags().filter(p => p.startsWith("permission:"))[0].split("permission:")[1]);
        return _i;
    }
    
    static Color(sender){
        let c = Color.WHITE;
        c = Permission.Get(sender).slice (0, 2);

        return c;
    }

    static GetDisplay(permission){
        let g = permission.split("permission:")[1];

        let display = Permission.BASE_DISPLAY;

        Permission.permissions.forEach(permission_ => {
            if(g == permission_[0]) {
                display = permission_[1];
            }
        });
        return display;
    }
}
