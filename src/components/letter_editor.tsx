export default function LetterEditor() {
    return (<form className="form-module">
        <input id="today" placeholder="text"></input>
        <input id="authorname" minLength={0} maxLength={25} placeholder="name"></input>
        <input id="authorlocation" minLength={0} maxLength={25} placeholder="where you're writing from"></input>
        <textarea id="letter" minLength={100} maxLength={2000} placeholder="enter your letter to a stranger/yourself"></textarea>
        <input type="submit" value="submit"></input>
    </form>)
}