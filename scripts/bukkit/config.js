import { Permission } from "./permissions/permissions";

export let configuration = 
{
    bukkit : {
        chat : {
            syntax : "§r[§g<player>§r] : §o<message>",
        },
        nickname : {
            syntax : "§r[§g<name>§r] : §o<nick>",
        },        
        permissions : {
            prefix : "§r[§gPermissions§r]§r",
        },
        commands : {
            help : {
                cmd: "!help",
                usage : "<cmd> [page]",
                description : "A guide to plugins."
            },
            spawn : {
                cmd: "!spawn",
                usage : "<cmd>",
                description : "Teleport you to the world spawnpoint."
            },
            nick : {
                cmd : "!nick",
                usage : "<cmd> [nickname]",
                description : "Use a nickname, or your default name is unspecified.",
                permission: Permission.VIP,
                enabled: false
            },
            setperm : {
                cmd : "!setperm",
                usage : "<cmd> <player> <permission>",
                description : "Set a permission to a player.",
                permission: Permission.MODERATOR,
                operator: true
            },
            listperm : {
                cmd : "!listperm",
                usage : "<cmd> <player> <permission>",
                description : "Set a permission to a player.",
                permission: Permission.MODERATOR,
                operator: true
            },

        }
    }
};