import { fetchCollection } from "../mongodb/chatMongoClient.js";

export function saveBroadcast(broadcast) {
    const data = {
        title: broadcast.title,
        content: broadcast.content
    };

    return fetchCollection("broadcast").insertOne(data);
} 

export function fetchAllBroadcasts() {
    return fetchCollection("broadcast").find().toArray();
}

export function saveChannel(channel) {
    const data = {
        id: channel.id,
        subject: channel.subject,
        messages: [],
    };
    
    return fetchCollection("channel").insertOne(data);
}

export function fetchAllChannels() {
    const projection = { subject: 1, _id: 0 };
    return fetchCollection("channel").find().project(projection).toArray();
}

export function deleteChannel(channelId) {
    return fetchCollection("channel").deleteOne({ id: channelId });
}

export function createMessage(channelId, message) {
    const data = {
      date: new Date(),
      sender: message.sender,
      content: message.content,
    };
    console.log(data);
    console.log(channelId);
    return fetchCollection("channel").updateOne(
      { id: Number.parseInt(channelId) },
      { $push: { messages: data} }
    );
  }

export function getChannelMessages(channelId) {
    return fetchCollection("channel")
    .aggregate([
        {
           $match: { id: Number.parseInt(channelId)}, 
        }, 
        {
            $project: {
                _id: 0, 
                messages: 1,
            },
        },
    ])
    .toArray()
    .then((result) => {
        console.log(result[0]);
        for (let i = 0; i < result.length; i++) {
            return result[i];
        }
        
    });
}

