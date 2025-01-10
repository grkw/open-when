export interface LetterViewer {

}

export default function LetterViewer() {
    return (
        <div>
            <p>letterprompt</p>
            <table>
                <tr>
                    <td>authorname</td>
                    <td>authorlocation</td>
                    <td>createddate</td>
                </tr>
                <tr>
                    <p>letterbody</p>
                    <p>letterimage</p>
                </tr>
            </table>
        </div>
    );
}