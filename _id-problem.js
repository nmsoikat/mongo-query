  //FIND // work fine
  const targetUser = await User.findById(targetUserId); //stringId
  const currentUser = await User.findById(currentUserId); //objectId
  
  //UPDATE
  // cancel friend request // first one not work
  await targetUser.updateOne({ $pull: { friendsRequest: currentUserId } }) //objectId // not work
  await currentUser.updateOne({ $pull: { friendsSentRequest: targetUserId } }) //stringId
  
  // cancel friend request // now work
  await targetUser.updateOne({ $pull: { friendsRequest: currentUserId.toString() } }) //stringId
  await currentUser.updateOne({ $pull: { friendsSentRequest: targetUserId } }) //stringId
