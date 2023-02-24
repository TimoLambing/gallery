import ImageItem from "@/components/image-item.vue";
import type { Image, ImageItemProps } from "@/types";
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

const exampleImage: Image = {
    idx: 0,
    filename: "Atacama-Desert-Chile.jpg",
    filepath: "/images/Atacama-Desert-Chile.jpg",
    alt: "Atacama Desert Chile",
    src: "/_nuxt/public/images/Atacama-Desert-Chile.jpg",
};

describe("ImageItem", async () => {
    const wrapper = mount(ImageItem, {
        props: <ImageItemProps>{
            image: exampleImage,
            preload: false,
            loading: "eager",
        },
        global: {
            stubs: {
                NuxtLink: {
                    name: "NuxtLink",
                    template: `<a><slot/></a>`,
                },
                NuxtPicture: {
                    name: "NuxtPicture",
                    template: `<img/>`,
                },
                NuxtImg: {
                    name: "NuxtImg",
                    template: `<img/>`,
                },
            },
        },
    });

    it("should have correct href attribute in parent anchor element", () => {
        const anchor = wrapper.find("a");
        expect(anchor.attributes("href")).toEqual(`/p/${exampleImage.idx}`);
    });

    it("should have correct alt text and attributes", () => {
        const image = wrapper.find(`img[id="${exampleImage.idx}"]`);
        const hiddenSpan = wrapper.find("span");
        expect(image.attributes("alt")).toEqual(exampleImage.alt);
        expect(hiddenSpan.text()).toEqual(exampleImage.alt);
    });

    it("should have 2 image elements with correct src attributes", () => {
        const imageElements = wrapper.findAll("img");
        expect(imageElements).toHaveLength(2);
        imageElements.forEach((element) => {
            expect(element.attributes("src")).toEqual(exampleImage.filepath);
        });
    });
});
