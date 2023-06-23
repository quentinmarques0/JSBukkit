import { world, system } from "@minecraft/server";

export class BukkitEntity {
    constructor(entity){
        let base = entity;

        this.dimension = base.dimension;
        this.id = base.id;
        this.isSneaking = base.isSneaking;
        this.lifetimeState = base.lifetimeState;
        this.location = base.location;
        this.nameTag = base.nameTag;
        this.scoreboardIdentity = base.scoreboardIdentity;
        this.target = base.target;
        this.typeId = base.typeId;

        this.addEffect = function(effectType, duration, options = {}) {
            return base.addEffect(effectType, duration, options);
        };        
        
        this.addTag = function(tag) {
            return base.addTag(tag);
        };

        this.applyDamage = function(amount, options = {}) {
            return base.applyDamage(amount, options);
        };

        this.applyImpulse = function(vector) {
            base.applyImpulse(vector);
        };

        this.applyKnockback = function(directionX, directionZ, horizontalStrength, verticalStrength) {
            base.applyKnockback(directionX, directionZ, horizontalStrength, verticalStrength);
        };
        
        this.clearVelocity = function() {
            base.clearVelocity();
        };

        this.extinguishFire = function(useEffects = {}) {
            return base.extinguishFire(useEffects);
        };

        this.getBlockFromViewDirection = function(options = {}) {
            return base.getBlockFromViewDirection(options);
        };

        this.getComponent = function(componentId) {
            return base.getComponent(componentId);
        };

        this.getComponents = function() {
            return base.getComponents();
        };

        this.getDynamicProperty = function(identifier) {
            return base.getDynamicProperty(identifier);
        };

        this.getEffect = function(effectType) {
            return base.getEffect(effectType);
        };

        this.getEffects = function() {
            return base.getEffects();
        };

        this.getEntitiesFromViewDirection = function(options = {}) {
            return base.getEntitiesFromViewDirection(options);
        };

        this.getHeadLocation = function() {
            return base.getHeadLocation();
        };

        this.getRotation = function() {
            return base.getRotation();
        };

        this.getTags = function() {
            return base.getTags();
        };

        this.getVelocity = function() {
            return base.getVelocity();
        };

        this.getViewDirection = function() {
            return base.getViewDirection();
        };

        this.hasComponent = function(componentId) {
            return base.hasComponent(componentId);
        };

        this.hasTag = function(tag) {
            return base.hasTag(tag);
        };

        this.kill = function() {
            return base.kill();
        };

        this.playAnimation = function(animationName, options = {}) {
            base.playAnimation(animationName, options);
        };

        this.removeDynamicProperty = function(identifier) {
            return base.removeDynamicProperty(identifier);
        };

        this.removeEffect = function(effectType) {
            return base.removeEffect(effectType);
        };

        this.removeTag = function(tag) {
            return base.removeTag(tag);
        };

        this.runCommand = function(commandString) {
            return base.runCommand(commandString);
        };

        this.runCommandAsync = function(commandString) {
            return base.runCommandAsync(commandString);
        };

        this.setDynamicProperty = function(identifier, value) {
            base.setDynamicProperty(identifier, value);
        };

        this.setOnFire = function(seconds, useEffects = {}) {
            return base.setOnFire(seconds, useEffects);
        };

        this.setRotation = function(rotation) {
            base.setRotation(rotation);
        };
        
        this.teleport = function(location, teleportOptions = {}) {
            base.teleport(location, teleportOptions);
        };
        
        this.triggerEvent = function(eventName) {
            base.triggerEvent(eventName);
        };

        this.tryTeleport = function(location, teleportOptions = {}) {
            return base.tryTeleport(location, teleportOptions);
        };
    }

    static Create(entity){
        let ent = entity;
        if(ent != null) ent = new BukkitEntity(entity);
        return ent;
    }
}