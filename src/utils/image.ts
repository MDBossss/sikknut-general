import { EmbedBuilder } from "discord.js";

async function generateRandomImgurImage(interaction: any) {
  // Characters allowed in Imgur IDs
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // Generate a random 5-character ID
  function generateRandomId() {
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result + "b"; // Append 'b' as per original specification
  }

  // Check if image exists and is valid
  async function checkImage(url: any) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      // Imgur returns 161x81 for non-existent images
      const contentLength = response.headers.get("content-length");
      return response.ok && contentLength !== "13421"; // 13421 is the size of the default "image not found" image
    } catch (error) {
      return false;
    }
  }

  // Try up to 5 times to find a valid image
  for (let attempt = 0; attempt < 5; attempt++) {
    const imageId = generateRandomId();
    const imageUrl = `https://i.imgur.com/${imageId}.png`;

    if (await checkImage(imageUrl)) {
      const embed = new EmbedBuilder()
        .setTitle("Random Imgur Image")
        .setImage(imageUrl)
        .setColor("#1bb76e") // Imgur's brand color
        .setFooter({ text: `Image ID: ${imageId}` })
        .setTimestamp();

      console.log(imageUrl);

      interaction.channel.send(imageUrl);
      // interaction.channel.send({ embeds: [embed] });
      return;
    }
  }
}

// Example slash command setup
const randomImgurCommand = {
  name: "randomimgur",
  description: "Generates a random Imgur image",
  async execute(interaction: any) {
    await generateRandomImgurImage(interaction);
  },
};

export { generateRandomImgurImage, randomImgurCommand };

module.exports = {
  generateRandomImgurImage,
  randomImgurCommand,
};
