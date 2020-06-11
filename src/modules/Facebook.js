const binarySearch = (arr, value) => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    let idValue = Number(arr[mid].id);

    if (idValue === Number(value)) return mid;

    if (idValue > value) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
};

var fbInfo = [];
var friendsList = [];

export const getInfo = async () => {
  try {
    const pageSource = await fetch(
      "https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed"
    )
      .then((e) => e.text())
      .then((e) => {
        return e;
      });
  
    const uid = pageSource.match(/ACCOUNT_ID\\":\\"(.*?)\\"/);
    const name = pageSource.match(/NAME\\":\\"(.*?)\\"/);
    
    const accessToken = pageSource.match(/accessToken\\":\\"(.*?)\\"/);
    const fbdtsg = pageSource.match(/{\\"dtsg\\":{\\"token\\":\\"(.*?)\\"/);
    fbInfo = {
      uid: uid[1],
      accessToken: accessToken[1],
      name: name[1],
      fbdtsg: fbdtsg[1],
    };
    return fbInfo;
  } catch (error) {
    console.log(error)
  }
  return []
  
};
const getFriendsList = async () => {
  let getFriendAPI = `https://graph.facebook.com/v3.0/me/friends?fields=gender,name&limit=50&access_token=${fbInfo.accessToken}`;

  while (true) {
    //get data
    const data = await fetch(getFriendAPI)
      .then((e) => e.json())
      .then((e) => {
        return e;
      })
      .catch((err) => {
        return null;
      });
    friendsList = data.data
      ? [...friendsList, ...data.data]
      : friendsList;

    if (data.paging.next) {
      getFriendAPI = data.paging.next;
    } else {
      return friendsList;
    }
  }
};

const fetchReactions = async (nextPage = "") => {
  var a = new FormData();
  a.append("fb_dtsg", fbInfo.fbdtsg);
  a.append(
    "q",
    "node(" +
      fbInfo.uid +
      "){timeline_feed_units.first(50).after(" +
      nextPage +
      "){page_info,edges{node{id,creation_time,feedback{reactors{nodes{id}},commenters{nodes{id}}}}}}}"
  );

  const data = await fetch("https://www.facebook.com/api/graphql/", {
    method: "POST",
    credentials: "include",
    body: a,
  })
    .catch(function () {
      return null;
    })
    .then((e) => e.json())
    .then((res) => {
      return res;
    });

  return data[fbInfo.uid]["timeline_feed_units"];
};
const scanReactions = async () => {
  let data = await fetchReactions();
  parseInteractPeople(data.edges);
  //data return

  while (data.page_info.has_next_page) {
    data = await fetchReactions(data.page_info.end_cursor);
    parseInteractPeople(data.edges);
  }
};

const parseInteractPeople = (interactData = []) => {
  for (let i = 0; i < interactData.length; i++) {
    //Feedback find users
    const commentNode = interactData[i].node.feedback.commenters.nodes || [];
    for (let j = 0; j < commentNode.length; j++) {
      let findIndex = binarySearch(friendsList, commentNode[j].id);
      if (findIndex !== -1) {
        try {
          friendsList[findIndex].interactCount.commenters += 1;
        } catch {
          friendsList[findIndex] = {
            ...friendsList[findIndex],
            interactCount: {
              reactors: 0,
              commenters: 1,
            },
          };
        }
      }
    }

    const reactNode = interactData[i].node.feedback.reactors.nodes || [];
    for (let j = 0; j < reactNode.length; j++) {
      let findIndex = binarySearch(friendsList, reactNode[j].id);
      if (findIndex !== -1) {
        try {
          friendsList[findIndex].interactCount.reactors += 1;
        } catch {
          friendsList[findIndex] = {
            ...friendsList[findIndex],
            interactCount: {
              reactors: 1,
              commenters: 0,
            },
          };
        }
      }
    }
  }
};

const showFriendsList = () => {
  return friendsList;
};
