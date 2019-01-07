import { PorterStemmerRu } from "natural";

export interface SonoffNodeInterface {
    id: string,
    name: string,
    mode: string,
    device: string,
    type: string,
    where: string[]
}

export function parseNodes(nodes: Object[]): SonoffNodeInterface[] {

    const parsedNodes = nodes.map(node => {
        return {
            id: (node as any).id as string,
            name: (node as any).name as string,
            mode: (node as any).mode as string,
            device: (node as any).device as string,
            type: (() => {
                const words = (node as any).name.split(' ');
                let type = 'device';
        
                words.forEach(word => {
                    if (/^свет/i.test(word)) {
                            type = 'light';
                        }
                });
                return type as string;
            })(),
            where: (() => {
                const words = (node as any).name.split(' ');
                let rooms = [];
    
                words.forEach(word => {
                    if (/^спал/i.test(word) ||
                    /^гост/i.test(word) ||
                    /^ван/i.test(word) ||
                    /^корид/i.test(word) ||
                    /^прихож/i.test(word) ||
                    /^кухн/i.test(word)) {
                        rooms.push(word as string);
                    }
                });

                return rooms.map(room => {
                    return PorterStemmerRu.stem(room)
                });
            })()
        }
    });

    return parsedNodes;
}