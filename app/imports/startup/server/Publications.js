import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profile';
import { LostItems } from '../../api/item/LostItems';
import { Images } from '../../api/item/Images';
import { FoundItems } from '../../api/item/FoundItems';
import { ResolvedItemsArchive } from '../../api/item/ResolvedItemsArchive';
import { Messages } from '../../api/item/Messages';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find({});
  }
  return this.ready();
});

Meteor.publish(LostItems.userPublicationName, function () {
  if (this.userId) {
    return LostItems.collection.find({});
  }
  return this.ready();
});

Meteor.publish(FoundItems.userPublicationName, function () {
  if (this.userId) {
    return FoundItems.collection.find({});
  }
  return this.ready();
});

Meteor.publish(ResolvedItemsArchive.userPublicationName, function () {
  if (this.userId) {
    return ResolvedItemsArchive.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Images.userPublicationName, function () {
  if (this.userId) {
    return Images.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Messages.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Messages.collection.find({ $or: [{ initiator: username }, { recipient: username }] });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find({});
  }
  return this.ready();
});

Meteor.publish(LostItems.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return LostItems.collection.find();
  }
  return this.ready();
});

Meteor.publish(FoundItems.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return FoundItems.collection.find();
  }
  return this.ready();
});

Meteor.publish(ResolvedItemsArchive.adminPublicationName, function () {
  if (this.userId) {
    return ResolvedItemsArchive.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Images.adminPublicationName, function () {
  if (this.userId) {
    return Images.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Messages.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Messages.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
