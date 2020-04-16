# Graphs


Graphs is a graph editor created on JS, TypeScript and Electron!
[vis-network](https://github.com/visjs/vis-network) performs visualization and interaction.
### Launch:
```sh
git clone https://github.com/BBCQX/Graphs
cd Graphs
yarn && yarn bstart
```
### Example
![Example](https://i.imgur.com/3km0xNf.png)

### Usage
Some main shortcuts are available now such as *Ctrl(Cmd)+S, Ctrl(Cmd)+N, Ctrl(Cmd)+O, Ctrl(Cmd)+Q*, but main graph manipulations are available ONLY via shortcuts:
- C key (with a node(s) or edge(s) selected) - *Color changing*
- T key (with edge(s) selected) - *Swaps selected edge directed/undirected*
- T key (with a node(s) selected) - *Changes shape of selected node*
- S key (with edge(s) selected) - *Swaps selected edge orientation*
- Double click (on an empty space) - *Creates a named node*
- Double click (on a node) - *Renames node*
- Double click (on an edge) - *Renames edge*
- Press SHIFT and drag(from a node to another node) - *Creates an edge*
- Backspace key (with edge(s) or node(s) selected) - *Deletes edge(s) or node(s)*
