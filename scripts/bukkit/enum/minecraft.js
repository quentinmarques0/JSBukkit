

import { world } from "@minecraft/server";

export class Color {
    static BLACK            = "§0";
    static DARK_BLUE        = "§1";
    static DARK_GREEN       = "§2";
    static DARK_AQUA        = "§3";
    static DARK_RED         = "§4";
    static DARK_PURPLE      = "§5";
    static GOLD             = "§6";
    static GRAY             = "§7";
    static DARK_GRAY        = "§8";
    static BLUE             = "§9";
    static GREEN            = "§a";
    static AQUA             = "§b";
    static RED              = "§c";
    static LIGHT_PURPLE     = "§d";
    static YELLOW           = "§e";
    static WHITE            = "§f";
    static MINECOIN_GOLD    = "§g";

    static Special          = {
            OBFUSCATED:     "§k",
            BOLD:           "§l",
            ITALIC:         "§o",
            RESET:          "§r",
    };
}

export class Dimension {
    static OVERWORLD = world.getDimension("overworld");
}

export class WorldHeight {
    static OVERWORLD = {
        MIN: -64,
        MAX: 320
    };
}

