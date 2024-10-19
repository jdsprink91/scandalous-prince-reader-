import RssParser from "rss-parser";

interface ExtendedItem {
  itunes?: {
    image?: string;
    owner?: {
      name?: string;
      email?: string;
    };
    author?: string;
    summary?: string;
    explicit?: string;
    categories?: string[];
    keywords?: string[];
  };
}

export type Feed = RssParser.Output<ExtendedItem>;

export type FeedItem = ExtendedItem & RssParser.Item;