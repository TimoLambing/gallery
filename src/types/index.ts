export type Image = {
    idx: number;
    filename: string;
    alt: string;
    src: string;
};

export type ImageItemProps = {
    image: Image;
    loading: "lazy" | "eager";
    preload: boolean;
};

export type ImageAction = "download" | "source" | "close";

export type ImageActionProps = {
    image: Image;
    action: ImageAction;
};
